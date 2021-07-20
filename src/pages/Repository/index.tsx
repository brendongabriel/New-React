import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';


interface RepositoryParams {
  repository: string;
}

interface Repositorio {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

const Repository: React.FC = () =>{
  const [repository, setRepository] = useState<Repositorio | null>(null);
  const [issues, setIssues ] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      console.log(response.data);
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      console.log(response.data);
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
          <img src={LogoImg} alt="GitHubExplorer"/>
          <Link to='/'>Voltar</Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Starts</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="black">
            <img
              src={issue.user.avatar_url} alt={issue.user.login}
            />
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
        </a>
        ))}
      </Issues>
    </>
  )
};

export default Repository;
