import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();
  console.log('Parâmetro repositorio:', repositorio);
  const [repositorioData, setRepositorio] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Abertas', active: false },
    { state: 'closed', label: 'Fechadas', active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = repositorio;
      console.log('Carregando repositório:', nomeRepo);

      try {
        const [repositorioResponse, issuesResponse] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: filters.find((f) => f.active).state,
              per_page: 5,
            },
          }).catch((error) => {
            console.error('Erro ao carregar issues (fallback):', error.response ? error.response.data : error.message);
            return { data: [] };
          }),
        ]);

        console.log('Resposta da API (repositório):', repositorioResponse);
        console.log('Resposta da API (issues):', issuesResponse);
        setRepositorio(repositorioResponse.data);
        setIssues(issuesResponse.data || []);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.status === 404
            ? `Repositório "${nomeRepo}" não encontrado. Verifique o nome ou tente outro repositório, como "facebook/react".`
            : `Erro ${error.response.status}: ${error.response.data.message || 'Falha ao carregar o repositório.'}`
          : 'Erro de rede. Verifique sua conexão.';
        console.error('Erro ao carregar repositório:', error.response ? error.response.data : error.message);
        setError(errorMessage);
        setLoading(false);
      }
    }

    load();
  }, [filters, repositorio]);

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = repositorio;

      try {
        const response = await api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters[filterIndex].state,
            page,
            per_page: 5,
          },
        });

        setIssues(response.data);
      } catch (error) {
        console.error('Erro ao carregar issues:', error);
        setIssues([]); // Reseta issues em caso de erro
      }
    }

    loadIssue();
  }, [filterIndex, filters, repositorio, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  if (error) {
    return (
      <Container>
        <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
        </BackButton>
        <div>{error}</div>
      </Container>
    );
  }

  if (!repositorioData || !repositorioData.owner) {
    return (
      <Container>
        <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
        </BackButton>
        <div>Dados do repositório não disponíveis.</div>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img src={repositorioData.owner.avatar_url} alt={repositorioData.owner.login} />
        <h1>{repositorioData.name}</h1>
        <p>{repositorioData.description}</p>
      </Owner>

      <FilterList $active={filterIndex}>
        {filters.map((filter, index) => (
          <button type="button" key={filter.label} onClick={() => handleFilter(index)}>
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.length === 0 ? (
          <div>Este repositório não tem issues disponíveis.</div>
        ) : (
          issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))
        )}
      </IssuesList>

      <PageActions>
        <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>
          Voltar
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Próxima
        </button>
      </PageActions>
    </Container>
  );
}