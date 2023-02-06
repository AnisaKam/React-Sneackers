import { useEffect, useState } from 'react'
import styles from './Card.module.scss';             //импортируем стили Card в файл index.js (тоже Card), все находится в одной папке - Card.


function Card({ imageUrl, title, price, onFavourite, onPlus }) {  // здесь тоже убираем props и вставляем основные св-ва из return ниже
    /*const onClickButton = () => {
        alert(props.title);
    }*/

    const [isAdded, setIsAdded] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);         //Урок 5 - сохранение закладок


    const onClickPlus = () => {              //здесь мы говорим - при клике onClickPlus вызываем метод onPlus, который есть в пропсах выше (в function Card)            
        onPlus( { imageUrl, title, price } );
        setIsAdded(!isAdded);
    }

    const onClickFavourite = () => {
        onFavourite( { imageUrl, title, price } );
        setIsFavourite(!isFavourite);
    }

    useEffect(() => {
        //console.log('Переменная изменилась');
    },[isAdded])

    /*console.log(isAdded); - для проверки работы состояния в консоли*/

    return (     // сразу ниже прописываем: <div className={styles.card}> и <div className={styles.favourite}> в фигурных скобках (до этого было просто card и favourite), чтобы заработали стили, где .card и . favourite- название класса, чтобы задать стили.
                /*<div className={styles.favourite} onClick={props.onFavourite}>
                <img width={133} height={112} src={props.imageUrl} alt='sneakers' /> 
                <h5>{props.title}</h5> 
                <b>{props.price}</b> - из этих строк убираем props - т.е. делаем деструктиризацию и наверху вместо function Card(props) {...} прописываем
                function Card({ imageUrl, title, price, onFavourite, onPlus }) {...};
                */ 
                /*Урок 5 : <img src='/img/heart-unliked.svg' alt='unliked'/> удаляем и прописываем условие для закладок (сердце белое/сердце красное)
                и меняю ...onClick={onFavourite}> на ...onClick={onClickFavourite}>*/
        <div className={styles.card}>                
        <div className={styles.favourite} onClick={onClickFavourite}>
            <img src={isFavourite ? '/img/liked.svg' : '/img/unliked.svg'} alt='unliked'/>
        </div>
            <img width={133} height={112} src={imageUrl} alt='sneakers' />    
            <h5>{title}</h5>

        <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
            <span>Цена:</span>
            <b>{price}</b>
            </div>
    
        <img className={styles.plus} onClick={onClickPlus} width={20} height={20} src= {isAdded ? '/img/btn-checked.png' : '/img/btn-plus.png'} alt='plus' />
            
            </div>
        </div>
)
}

export default Card;

// в фигурных скобках с помощью props и точки - {props. ...} можно запросить данные из списка, которые заложены в компонентах,
// например в Card заложены: title, price, imageUrl (в документе App.js). Данных может быть больше и какие угодно.
        
// возможно 2 варианта написания с onClick: 
// 1).  <button className='button' onClick={() => onClickButton()}>
// 2).  <button className='button' onClick={onClickButton}>  (работать будет одинаково)

/* в 4 уроке меняем написанный код на строках 23,24,25 - убираем button, делаем onClick:
Было:
<button className='button' onClick={props.onPlus}>                    
<img width={11} height={11} src='/img/plus.svg' alt='plus' />
</button>
Стало:
<img onClick={props.onPlus} width={20} height={20}  src='/img/btn-plus.png' alt='plus' />  размеры картинок в видео убирают, но я оставила 
т.к. они огромные (видимо из-за формата png)
Cтало 2: поменяли содержимое {} onClick={props.onPlus} на onClick={onClickPlus}
Стало 3: изменили src: src = {isAdded }
*/