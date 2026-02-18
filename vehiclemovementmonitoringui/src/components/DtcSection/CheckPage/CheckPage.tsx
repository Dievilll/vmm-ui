import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputPageTemplate from "../../Templates/InputPageTemplate/InputPageTemplate.tsx";

const EntryPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCarClick = (carNumber: string) => {
        console.log('Выбран автомобиль:', carNumber);
        navigate(`/entry/vehicle/${carNumber}`);
    };

    const handleBackToMain = () => {
        navigate('/dtc/navigate');
    };
    
    const customHandleInputSubmit = () => {
        
    }

    return (
        <InputPageTemplate
            title="Отсканируйте штрих-код на пачке"
            inputPlaceholder="ШТРИХ-КОД"
            errorMessage="Пакет не найден!"
            minLength={8}
            onLoginSuccess={(data) => console.log('Успешно!', data)}
            BackButton={true}
            handleBackToMain={handleBackToMain}
        />
    );
};

export default EntryPage;