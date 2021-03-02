import React from "react";
import { Link } from "react-router-dom";
import FetchProducts from "../../components/FetchProducts";
import Header from "../../components/Header";
import ProductItem from "../../components/ProductItem/ProductItem";
import injectUser from "../../HoC/injectUser";

class Home extends React.Component {
    render(){
      return (
        <div className="col">
          <div className="col row">
            <div className="col">
              <h3>Products</h3> 
            </div>
              <Link to="/my_cart"><h3>My Cart</h3></Link>
            <div className="col">
              
              <Link to="/logout"><h3>Logout</h3></Link>
            </div>
            <div className="col">
            </div>
            <div className="card card-body">
              <div className="row">
                <FetchProducts>
                  {({ loading, error, products }) => {
                    if (loading) return "Loading...";
                    if (error) return <p>{error.message}</p>
                    return products.map(product => <ProductItem product={product}/>)
                  }}
                </FetchProducts>
              </div>
            </div>
          </div>
        </div>

      )
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