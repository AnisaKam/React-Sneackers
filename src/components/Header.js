import { Link } from 'react-router-dom';

function Header (props) {
    //console.log(props)

return (
<header className='d-flex justify-between align-center p-40'>
    <Link>
    <div className='d-flex align-center'>
    <img width={40} height={40} src="/img/logo.png" alt="logo" />
    <div className='headerInfo'>
        <h3 className='text-uppercase'>React Sneakers</h3>
        <p className='opacity-5'>Магазин лучших кроссовок</p>
    </div>
    </div>
    </Link>
    
    <ul className='d-flex'>                                             
        <li onClick={props.onClickCart} className='mr-30 cu-p'>         
        <img width={30} height={30} src="/img/cart.svg" alt="корзина" />
        <span>1205руб.</span>
        </li>
        <li className='mr-20 cu-p'>
        <Link to='/favourites' >
        <img width={25} height={25} src="/img/heart.svg" alt="закладки" />
        </Link>
        </li>
        <li>
        <img width={25} height={25} src="/img/profile.png" alt="пользователь" />
        </li>
    </ul>
</header>
);
} 

export default Header;

/* прописываем onClick={props.onClickCart} в <li onClick={props.onClickCart} className='mr-30 cu-p'> - даем команду - при клике на li (у каждого html элемента есть onClick)
вызывай функцию, которая находится в props и называется onClickCart*/