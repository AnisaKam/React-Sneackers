function Drawer({ onClose, onRemove, items = [] }) {               // прописываем в скобках props и ниже (кнопка close)(Корзина), <img onClick={props.onClose} - при клике бери из props onClose
                                                        //Урок 5: в функцию выше пропишем onRemove
    return (
        <div className='overlay'>
    <div className='drawer'>
    <h2 className='d-flex justify-between mb-30'>Корзина<img onClick={onClose} className='cu-p removeBtn' src='/img/btn-remove.svg' alt='close'/></h2>

    {items.length > 0 ? (<div>
        <div className='items'>
        {items.map((obj) => (
            <div className='cartItem d-flex align-center mb-20'>
            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className='cartItemImg'></div>
        
        <div className='mr-20 flex'>
            <p className='mb-5'>{obj.title}</p>
            <b>{obj.price} руб.</b>
        </div>
            <img onClick={() => onRemove(obj.id)}
            className='removeBtn' 
            src='/img/btn-remove.svg'
            alt='remove'/>
        </div>))}
        </div>

            <div className='cartTotalBlock'>

            <ul>
                <li className='d-flex'>
                    <span>Итого:</span>
                    <div></div>
                    <b>21498 руб.</b>
                </li>

                <li className='d-flex'>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                </li>
            </ul>

            <button className='greenButton'>Оформить заказ <img src='/img/arrow.svg' alt='arrow'/></button>
            </div>
        </div>) : <div className='cartEmpty d-flex align-center justify-center flex-column flex'>                    
        <img className='mb-20' width='170px' height='170px' src='/img/empty-cart.jpg' alt="empty-cart"/> 
        <h2>Корзина пустая</h2>
        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
        <button onClick={onClose} className="greenButton">
            <img src='/img/arrow.svg' alt='arrow'/>Вернуться назад
        </button>
    </div>
    }    

    </div>
</div>
);
}

export default Drawer;

// убираем style={{ display:'none' }} из первой строчки в return из div с классом overlay.
//для перекидки товара в корзину (2:14 (время) в 4 видеоуроке) мы из Drawer.js удаляем содержимое в <div className='items'> ....  </div>:
/*<div className='items'>

<div className='cartItem d-flex align-center mb-20'>
    <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>

<div className='mr-20'>
    <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
    <b>12999 руб.</b>
</div>
    <img className='removeBtn' src='/img/btn-remove.svg' alt='remove'/>
</div>

<div className='cartItem d-flex align-center'>
<div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>

<div className='mr-20'>
    <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
    <b>12999 руб.</b>
</div>
    <img className='removeBtn' src='/img/btn-remove.svg' alt='remove'/>
</div>

<div className='cartItem d-flex align-center mb-20'>
<div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>

<div className='mr-20'>
    <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
    <b>12999 руб.</b>
</div>
    <img className='removeBtn' src='/img/btn-remove.svg' alt='remove'/>
</div>
</div>

и вместо удаленного кода пропишем так:
<div className='items'>
    {props.items.map((obj) => (
        <div className='cartItem d-flex align-center mb-20'>
        <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>
    
    <div className='mr-20'>
        <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
        <b>12999 руб.</b>
    </div>
        <img className='removeBtn' src='/img/btn-remove.svg' alt='remove'/>
    </div>
    ))}

    Далее делаем деструктуризацию, вместо function Drawer(props) ...  и вместо ...Корзина<img onClick={onClose, items} и вместо ...{props.items.map((obj) => ( :
    function Drawer({ onClose }) {               
    return (
        <div className='overlay'>
    <div className='drawer'>
    <h2 className='d-flex justify-between mb-30'>Корзина<img onClick={props.onClose} className='cu-p removeBtn' src='/img/btn-remove.svg' alt='close'/></h2>

    <div className='items'>
    {items.map((obj) => (
        <div className='cartItem d-flex align-center mb-20'>
        <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>

...но все не получается и тогда мы прописываем, что items по умолчанию будет хранить пустой массив:
function Drawer({ onClose, items = [] }) { ...

    далее переходим в App.js
*/