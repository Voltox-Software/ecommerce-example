import React from "react";
import { Link } from "react-router-dom";
import FetchProducts from "../../components/FetchProducts";
import Header from "../../components/Header";
import ProductItem from "../../components/ProductItem/ProductItem";
import injectUser from "../../HoC/injectUser";

class Home extends React.Component {
    render(){
        return (
            <div>
              <Link to="/logout">Logout</Link><br/>
              {JSON.stringify(this.props.current_user)}<hr/>
              <FetchProducts>
                {({ loading, error, products }) => {
                  if (loading) return "Loading...";
                  if (error) return <p>{error.message}</p>
                  return products.map(product => <ProductItem product={product}/>)
                }}
              </FetchProducts>
              <Link to="/my_cart">My Cart</Link>
            </div>    
        )
    }
}

export default injectUser(Home);