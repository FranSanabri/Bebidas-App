import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Cards.module.css'

class CardProduct extends React.Component {

    render() {
        return (
            <div className={s.card}>
                <img src={this.props.image} width="300px" height="250px" alt=""/>
                <div className={s.card__content}>
                    <h3 className={s.nombre}>{this.props.name}</h3>
                    <p className={s.type}>{this.props.type}</p>
                    <p className={s.stock}>{this.props.stock}</p>
                    <p>{this.props.descuentos}</p>
                 <  NavLink to={`/detail/${this.props.id}`} className={s.navLink}><span className={s.leer_mas}>Más</span></NavLink>
             </div>
            </div>
        )
    }
} 


export default CardProduct;