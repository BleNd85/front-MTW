import classes from "./style.module.css";

export default function Main() {
    return (
        <div className={classes.userPage}>
            <div className={classes.infoCard}>
                <h1 className={classes.cardItem}>Модульна Контрольна Робота</h1>
                <h2 className={classes.cardItem}>ІО-22 Удод Владислав</h2>
                <h3 className={classes.cardItem}>Варіант - 2</h3>
                <h3 className={classes.cardItem}>Сервіс для генерації коротких посилань</h3>
            </div>
        </div>
    )
}