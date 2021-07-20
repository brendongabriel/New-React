import { useState, useEffect, FormEvent } from 'react';
import { Title, Repositories, Form, Error } from './styles';
import { Link } from 'react-router-dom';
import api from '../../services/api';

interface Repository{
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const[newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const[repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepository = localStorage.getItem(
      '@GitHubExplorer:repositories'
    );

    if(storageRepository){
      return JSON.parse(storageRepository);
    }

    return[];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories)
    )
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
      event.preventDefault();

      if(!newRepo){
        setInputError("Digite um usuário/repositório para pesquisar. ");
        return;
      }

      try{

        const response = await api.get<Repository>(`repos/${newRepo}`);
        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');

      }catch(err){
        setInputError("Repositório não encontrado ou inexistente. ");

      }
  }

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" value={newRepo}/>
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError }</Error>}

      <Repositories>

        {repositories.map(repository => (
        <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
        </Link>
        ))}

      </Repositories>
    </>
  );
};

export default Dashboard;
