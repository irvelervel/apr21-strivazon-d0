import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import CartIndicator from './components/CartIndicator'
import BookStore from './components/BookStore'
import Cart from './components/Cart'
import { Route, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

// we should store the cart array here!!
// let's use a hook!

const App = () => {
  const [cart, setCart] = useState([])

  // [{
  //   book: book,
  //   quantity: 1
  // }, {
  //   ...etc
  // }]

  const addToCart = (book) => {
    // firstly, let's check if we already have the book in the cart
    let cartCopy = [...cart]

    let bookIndex = cart.findIndex((b) => b.book?.id === book.id)
    if (bookIndex > -1) {
      // we already have the book in the cart, let's just increase the quantity
      cartCopy[bookIndex].quantity = cartCopy[bookIndex].quantity + 1
    } else {
      cartCopy.push({
        book: book,
        quantity: 1,
      })
    }

    // let newCart = [...cart]
    // newCart.push(book)

    setCart(cartCopy)
  }

  const removeFromCart = (index) => {
    // let newCart = cart.filter((c, i) => i !== index)
    // newCart is an array with all the elements aparte from the one with the index we provided

    let cartCopy = [...cart]
    if (cartCopy[index].quantity > 1) {
      cartCopy[index].quantity--
    } else {
      cartCopy = cartCopy.filter((c, i) => i !== index)
    }

    // let newCart = [...cart.slice(0, index), ...cart.slice(index + 1)]
    setCart(cartCopy)
  }

  return (
    <Router>
      <Container>
        <Row>
          <Col sm={12} className="text-center background-div">
            <Link to="/">
              <h1>Strivazon Book Store</h1>
            </Link>
          </Col>
          <CartIndicator cartLength={cart.reduce((acc, currentValue) => acc + currentValue.quantity, 0)} />
        </Row>
        <hr />
        <Route path="/" exact render={() => <BookStore addToCart={addToCart} />} />
        <Route
          path="/cart"
          exact
          render={(routerProps) => <Cart {...routerProps} cart={cart} removeFromCart={removeFromCart} />}
        />
        {/* using the 'render' prop will NOT pass automatically history, location and match */}
        {/* Route here is called a HOC High Order Component */}
      </Container>
    </Router>
  )
}

export default App
