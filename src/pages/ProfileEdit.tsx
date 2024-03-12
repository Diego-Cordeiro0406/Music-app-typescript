import { useState, useEffect } from "react";
import Header from "../components/Header";
import { readUser, updateUser } from "../services/userStorage";
import { useNavigate } from "react-router-dom";

function ProfileEdit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    image: ''
   });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readUser();
        setFormData(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
       ...prevFormData,
       [name]: value,
    }));
   };
  
  const handleClick = async() => {
    updateUser(formData)
    navigate('/profile')
  };

  const valForm = (formData
    .name.length > 1 && formData
    .email.length > 1 && formData
    .description.length > 1 && formData
    .email.endsWith('.com'));

  return (
    <>
      <Header />
      <main data-testid="page-profile-edit">
        <section>
          <div>
            <label htmlFor="input-name"></label>
            <input
              data-testid="edit-input-name"
              value={formData.name}
              placeholder="Exemplo: Zézinho"
              name="name"
              id="input-name"
              type="text"
              onChange={ handleInputChange }
            />
          </div>
          <div>
            <label htmlFor="input-email"></label>
            <input
              data-testid="edit-input-email"
              value={formData.email}
              placeholder="usuario@email.com"
              name="email"
              id="input-email"
              type="email"
              onChange={ handleInputChange }
            />
          </div>
          <div>
            <label htmlFor="input-description"></label>
            <textarea
              data-testid="edit-input-description"
              value={formData.description}
              placeholder="Admirador(a) de músicas"
              name="description"
              id="input-description"
              onChange={ handleInputChange }
            />
          </div>
          <button
            data-testid="edit-button-save"
            onClick={ handleClick }
            disabled={ !valForm }
          >
            Salvar
          </button>
        </section>
      </main>
    </>
  )
}

export default ProfileEdit;