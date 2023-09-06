import { useContext, useEffect, useState } from "react";
import ItemList from "../componentes/ItemList"
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { collection, getDocs } from "firebase/firestore";
import { db} from "../firebase/app";


function ItemListContainer() {
  const [isLoading, setLoading] = useState(true);
  const [joyas, setJoyas] = useState([]);
  const category = ["anillo", "arete", "collar"]
  const {id} = useParams();
  //const {cartArray} = useContext(CartContext)
useEffect(()=> {
  setLoading(true)
  //const coleccionProductos = id ? query(collection(db, "items"), where("id", "==", id)):collection(db, "joyas") 
  const coleccionProductos = collection(db, "items")
  getDocs(coleccionProductos)
  .then((res)=> {
    const list = res.docs.map((joyas)=> {
      return{
        id:joyas.id,
        ...joyas.data()
      }
    })
    setJoyas(list)
  })
  .catch((error)=> console.log(error))
  .finally(()=> setLoading(false))
}, [id])

  if (isLoading)
    return (
      <div>
        <h3>Cargando...</h3>
      </div>
    );
  return (
    <main>
        <nav className="productos">
        <Link to="/">
            <button>Todos los productos</button>
          </Link>
          {category.map(categoria => <Link key={categoria} to={`/category/${categoria}`}> <button>{categoria}</button></Link> )}
         
          </nav>
          <ItemList joyas={joyas} />
    </main>
  );
}

export default ItemListContainer;