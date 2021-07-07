import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import { Title, Repositories, Form } from './styles';
import { FiChevronRight } from 'react-icons/fi';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }
  return (
    <>
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        {/*repositories.map(repository => (
          <a key ={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight />
          </a>
        ))*/}

        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/82897681?v=4"
            alt="Jean"
          />
          <div>
            <strong>jeanrgl/s-react-app-exercise</strong>
            <p>asassasasasasa</p>
          </div>
          <FiChevronRight />
        </a>

        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/82897681?v=4"
            alt="Jean"
          />
          <div>
            <strong>jeanrgl/s-react-app-exercise</strong>
            <p>asassasasasasa</p>
          </div>
          <FiChevronRight />
        </a>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/82897681?v=4"
            alt="Jean"
          />
          <div>
            <strong>jeanrgl/s-react-app-exercise</strong>
            <p>asassasasasasa</p>
          </div>
          <FiChevronRight />
        </a>
      </Repositories>

    </>
  );
};

export default Dashboard;
