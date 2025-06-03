
import styles from './UserMenu.module.css';

export default function UserMenu(){
    return(
        <div className={styles.user_menu_main}>
            
            <div className={styles.user_menu_item} style={{paddingTop:'10px'}}>Profile</div>
            <div className={styles.user_menu_item}>Settings</div>
            <div className={styles.div_line}></div>
            <div className={styles.user_menu_item} style={{paddingTop:'10px'}}>Logout</div>
        </div>
    )
}
    