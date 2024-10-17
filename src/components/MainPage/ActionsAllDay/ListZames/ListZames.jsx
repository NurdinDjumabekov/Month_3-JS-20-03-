import React from "react";
import "./style.scss"; // Здесь можно стилизовать карточки

const ListZames = () => {
  const mixes = [
    {
      name: "Производство колбасы 'Салями'",
      ingredients: [
        { name: "Свинина", quantity: "1 кг" },
        { name: "Говядина", quantity: "500 г" },
        { name: "Чеснок", quantity: "3 зубчика" },
        { name: "Соль", quantity: "20 г" },
        { name: "Перец черный молотый", quantity: "5 г" },
        { name: "Нитритная соль", quantity: "10 г" },
      ],
      mixTime: "30 минут",
      restTime: "12 часов",
    },
    {
      name: "Производство копченой колбасы",
      ingredients: [
        { name: "Свинина", quantity: "800 г" },
        { name: "Говядина", quantity: "400 г" },
        { name: "Сало", quantity: "200 г" },
        { name: "Чеснок", quantity: "4 зубчика" },
        { name: "Соль", quantity: "25 г" },
        { name: "Перец черный молотый", quantity: "7 г" },
      ],
      mixTime: "25 минут",
      restTime: "24 часа",
    },
  ];

  return (
    <div className="zames" style={{ height: "99%", width: "60%" }}>
      <div className="zames__inner">
        {mixes?.map((mix, index) => (
          <div key={index} className="mix">
            <h3>{mix.name}</h3>
            <table>
              <thead>
                <tr>
                  <th>Ингредиент</th>
                  <th>Количество</th>
                </tr>
              </thead>
              <tbody>
                {mix.ingredients.map((ingredient, i) => (
                  <tr key={i}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Время смешивания: {mix.mixTime}</p>
            <p>Время маринования/отдыха: {mix.restTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListZames;
