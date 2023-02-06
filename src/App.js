
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';                             //импортируем axios и ниже меняем запрос fetch на axios
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Link } 
  from 'react-router-dom';


/* const arr = [                                       - пустой const прописываем в функции ниже и названия arr не будет, будут состояния: items и setItems.
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede',   - удаляем весь список
  price: 12999,
  imageUrl: '/img/sneakers/1.jpg'
  },

  {title: 'Мужские Кроссовки Nike Air Max 270',
  price: 15600,
  imageUrl: '/img/sneakers/2.jpg'
  },

  {title: 'Мужские Кроссовки Nike Blazer Mid Suede',
  price: 8499,
  imageUrl: '/img/sneakers/3.jpg'
  },

  {title: 'Кроссовки Puma X Aka Boku Future Rider',
  price: 8999,
  imageUrl: '/img/sneakers/4.jpg'
  }
]*/

function App() {

  const [items, setItems] = useState([]);                 // копируем и вставляем из mockapi (сайт-база данных) наш товар, но потом убираем

  const [cartItems, setCartItems] = useState([]);       //создаем отдельный массив для хранения товара в корзине, он будет пустой
/*{                                                     // для проверки изображения создаем фейковый массив, но потом удаляем (урок 4  примерное время:2:17:00)
  "title": "Мужские Кроссовки Nike Blazer Mid Suede",
  "price": 12999,
  "imageUrl": "/img/sneakers/1.jpg"
},
{
  "title": "Мужские Кроссовки Nike Air Max 270",
  "price": 15600,
  "imageUrl": "/img/sneakers/2.jpg"
}
]); */
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);   /* состояние, когда корзина по умолчаию закрыта. шаг 1: создаем состояние для того, чтобы убрать окно корзины
                                                        (св-во display:none в Drawer.js убрали)
                                                        шаг 2: ниже прописываем {cartOpened ? <Drawer/> : null} если на значок корзины нажали и это правда - покажи окно корзины.
                                                        т.е <Drawer/>, если нет то - ничего не показывай (null) 
                                                        шаг 3: приклике на цену (li) должна открываться корзина - это прописываем сразу ниже:
                                                        <Header onClickCart={() =>setCartOpened(true)} />
                                                        и в Header.js в самой функции прописываем в скобках props - function Header (props) {...} 
                                                        шаг 4: для закрытия корзины прописываем onClose={() => setCartOpened(false)} в строчке кода
                                                        {cartOpened ? <Drawer onClose={() => setCartOpened(false)}/> : null}, далее в Drawer.js в функции прописываем в () -
                                                        - (props) - function Drawer(props) {...} и дописываем код в кнопке close там же, ниже.
                                                        Кроме того, можно сократить код и вместо {cartOpened ? <Drawer onClose={() => setCartOpened(false)}/> : null}, прописать
                                                        {cartOpened && <Drawer onClose={() => setCartOpened(false)}/> }  */
  
  useEffect(() => {
  fetch ('https://63a73c3359fd83b1bb418bab.mockapi.io/items')
    /*.then((res) => {
      return res.json();
    })
    .then((json) => {
      setItems(json);           // чтобы посмотреть результат в консоли прописываем: console.log(json)
    });*/

    axios.get('https://63a73c3359fd83b1bb418bab.mockapi.io/items').then((res) => {              //Урок 5: После того, как прописываем код axios, код then удаляем.
      //console.log(res.data); убираем console.log и вместо него прописываем setItems:
      setItems(res.data);
    })

    axios.get('https://63a73c3359fd83b1bb418bab.mockapi.io/cart').then((res) => {              //Урок 5: здесь запрашиваем корзину (mockAPI) и передаем все объекты массива в корзину 
    setCartItems(res.data);
  })

  },[]); 

  const onAddToCart = (obj) => {                                      //здесь при вызове этого метода, должно выйти alert  и ниже вместо onPlus = {() => console.log('Нажали плюс')}
    axios.post('https://63a73c3359fd83b1bb418bab.mockapi.io/cart', obj); //в запросе axios меняем get на post, и items (в ссылке) на cart (его мы создали в mockAPI - сайт)    
                                                                      //p.s. get-запрос исп-ся при получении чего-то, post-запрос при создании чего-то
    //setCartItems([...cartItems, obj]);     //onPlus = {onAddToCart} - cодержимое в фигурных скобках это эта константа
    setCartItems((prev) => [...prev, obj]);    //Далее для проверки меняем снова: onPlus = {() => console.log('plus')}, в консоле мы увидим plus, но нам не интересно это, поэтому снова 
    //console.log(cartItems);                //вносим изменения:
                                             //onPlus = {(obj) => console.log(obj)} - в консоли мы увидим объект со свойствами, столько, сколько нажали на плюс (сколько выбрали кроссовок)*/
    //console.log(obj);                      //прописываем setCartItems([...cartItems, obj]); - т.е. setCartItems берет все, что есть в cartItems и в конец пушит новый объект.
                                             //далее перепишем код: setCartItems([...cartItems, obj]); на код: setCartItems(prev => [...prev, obj]);
  }

    const onRemoveItem = (id) => {
      console.log(id)
      //axios.delete(`https://63a73c3359fd83b1bb418bab.mockapi.io/cart/${id}`);   //Урок 5: удаление из корзины и ниже в return добавляем: onRemove={onRemoveItem} и передаем эту инф-ию - onRemove в Drawer.js в img...
      //setCartItems((prev) => [...prev, obj]);
      setCartItems((prev) => prev.filter(item => item.id !== id));      //Урок 5: код означ: дай мне предыд. массив (prev), возьми все что в нем есть, пробегись по нему и отфильтруй 
    }                                                                   // тот элемент у которого id тот, который я передал этой функции (onRemoveItem) - т.е. остаются все элементы (id),
                                                                  //кроме того элемента (id) на х которого нажали.

    const onAddToFavourite = (obj) => {
    axios.post('https://63a73c3359fd83b1bb418bab.mockapi.io/favourites', obj);
    setFavourites((prev) => [...prev, obj]);
    }

    const onChangeSearchInput = (event) => {   // делаем Поиск... (отбор) (input) c помощью event - события. Урок 5 29:00. Ниже в return в input прописываем ссылку на этот метод:
      console.log(event.target.value);         // <input onChange={onChangeSearchInput} placeholder='Поиск...'/>
      setSearchValue(event.target.value);      // Далее в h1 прописываем условие: <h1>{searchValue ? `Поиск по запросу: '${searchValue}'` : 'Все кроссовки' }</h1>, которое означает,
    };                                         // если в Поисковике что-то пишем, вместо "Все кроссовки" появляется фраза "Поиск по запросу: + здесь то, что написали в "Поиск..." 
                                               // если же ничего не пишем, то остается "Все кроссовки". В return в input прописываем value={searchValue} - в инпут делаем иконку х
                                               // создаем контролируемый инпут.
                                               // создаем иконку х в инпуте, для этого создаем условие и заключаем все в фигурные скобки:
                                               // {searchValue && <img className='clear cu-p' src='/img/btn-remove.svg' alt='clear'/>}, которое означает, если в searchValue (в интпуте)
                                               // ничего нет (не прописывается/не ищется), то х (код после &&) - не отображать.
                                               // Чтобы при нажатии на х все удалялось добавим в код onClick: при нажатии на х покажи пустую строку:
                                               // {searchValue && <img onClick={() => setSearchValue('')} className='clear cu-p' src='/img/btn-remove.svg' alt='clear'/>}
    return (
    <div className='wrapper clear'>
      
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}   
      
      <Header onClickCart={() => setCartOpened(true)}/>    

      

      <Router>
      <nav>
        <Link to='/' className='link'>Home</Link>
      </nav>
  

      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favourites' element={<favourites/>} />
      </Routes>

      </Router>

        <div className='content p-40'>

        <div className='d-flex align-center justify-between mb-40'>
        
        <h1>{searchValue ? `Поиск по запросу: '${searchValue}'` : 'Все кроссовки' }</h1>

          <div className='search-block'>
          <img width={25} height={25} src="/img/search.png" alt='search'/>
          {searchValue && <img onClick={() => setSearchValue('')} className='clear cu-p' src='/img/btn-remove.svg' alt='clear'/>}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'/>     
        </div>
          
        </div>

        <div className='d-flex flex-wrap justify-between'>
          {items.filter(item => item.title.toLowerCase().includes(searchValue))  /*Урок 5:  40:00: в items прописываем метод filter - даем команду: отфильтруй все, что есть у тебя, найди мне в item 
                                                    title и из title найди любое содержимое (includes), которое есть в searchValue (кот. включает searchValue)
                                                    filter(item => item.title.inclides(searchValue))
                                                    также добавляем toLowerCase(), чтобы при поиске при любом написании букв и цифр все находилось (заглавные и строчные буквы)*/
          .map((item) => (                          // Урок ...: с помощью метода map перебираем все объекты (и этот метод возвращает нам обратно все, что перебрал,
            <Card                                   // в отличии от метода forEach) в массиве const arr и так как их 2, будут отражены 2 карточки
            //key={index}
            title = {item.title}
            price = {item.price}
            imageUrl = {item.imageUrl}
            onFavourite = {(obj) =>onAddToFavourite(obj)}  //Урок5: onFavourite={()=>console.log('Добавили в закладки')}-удаляем содержимое в фигурных скобках и прописываем onFavourite = {onAddToFavourite}
            onPlus = {(obj) => onAddToCart(obj)}        //obj берется из Card.js const onClickPlus = () => {              //здесь мы говорим - при клике onClickPlus вызываем метод onPlus, который есть в пропсах выше (в function Card)            
            />                                          // onPlus( { imageUrl, title, price } );
                                                        //setIsAdded(!isAdded); - далее здесь удаляем console.log и прописываем onAddToCart, а в const onAddToCart в скобках 
                                                        // прописываем obj: const onAddToCart = (obj) => { 
                                                        //  console.log(1,2,3)}
          ))}
  
        
        </div>
      
      
      </div>
    </div>
  );
}
/*

<Route path='/test'>Это тестовая информация</Route> 

      <Routes>
        <Route path="/" element={<Home
          items={items} 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavourite}
          onAddToCart={onAddToCart} />}
        />
        <Route path="/favourites" element={
          <favourites
            items={favourites}
            onAddToFavourite={onAddToFavourite}
          />}
        />
      </Routes>*/

export default App;

/* из Drawer.js переходим сюда и в строке рядом с Drawer прописываем items={cartItems}:
{cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)}/> : null} */
