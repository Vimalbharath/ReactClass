

/* const SideBar = ({title}) =>(
    <div className="container">
      <h2 style={{color:'grey'}}>
         {title}
      </h2>
      <div className="body">
         <Widget/>
      </div>
    </div>
) */


const SideBar = ({title}) =>(
    <Container>
      <Title>
         {title}
      </Title>
      <Body>
         <Widget/>
      </Body>
    </Container>
)



// Without React.lazy() - How to improve this code 
import AboutComponent from './AboutComponent ';

// With React.lazy() - Refactor code
const AboutComponent = React.lazy(() => import('./AboutComponent '));

const HomeComponent = () => (
    <div><AboutComponent /></div>
)



import { React, Component } from 'react';
import styles from '../BtnComponent/BtnComponent.css'

class BtnComponent extends Component {
    render() {
        return (
            <button className={styles.btn}>
                Click for CSS Modules !        
            </button>
        );
    }
}

export default BtnComponent