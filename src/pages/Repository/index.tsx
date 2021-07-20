import React, { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';
import { useEffect } from 'react';


interface RepositoryParams{
  repository: string;
}

interface Repository{
  full_name: string;
  description: string;
  stargazzers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue{
  id: number;
  title: string;
  html_url: string;
  user:{
    login: string;
  }
}

const Repository: React.FC = () =>{
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues ] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}/issues`).then(response => {
      console.log(response.data);
    })
  },[params.repository])

  return (
    <>
      <Header>
          <img src={LogoImg} alt="GitHubExplorer"/>
          <Link to='/'>Voltar</Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src="https://avatars.githubusercontent.com/u/69631?s=88&v=4" alt="Facebook" />
          <div>
            <strong>Facebook</strong>
            <p>Repositório do ReactJS no GitHub do Facebook</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>172K</strong>
            <span>Starts</span>
          </li>
          <li>
            <strong>34K</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>574</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>

        <Link to='teste'>
            <img
              src="https://avatars.githubusercontent.com/u/82897687?v=4" alt="Brendon"
            />
            <div>
              <strong>Facebook</strong>
              <p>Descriçaõ do repossitorio</p>
            </div>
        </Link>
      </Issues>
    </>
  )
};

export default Repository;
