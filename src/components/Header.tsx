import styles from './Header.module.css'
import TodoSvg from '../assets/Logo.svg'

export const Header = () => {
    return (
        <header className={styles.header}>
            <img src={TodoSvg} alt="Logo todo" />
           
        </header>
    )
}