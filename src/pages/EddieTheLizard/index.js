import React, { Component } from 'react';
//External components
import Slider from 'react-slick'
import Modal from 'react-modal'
//Internal components
import Product from 'components/Product'
//Images
import backgroundImg from 'images/background.svg';
import logo from 'images/logo.svg';
import westerwynhollow from 'images/westerwynhollow.svg';

class EddieTheLizard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showModal: false,
      modalImage: '',
      isCartOpen: false,
      checkout: { lineItems: [] },
      product: {},
      shop: {}
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }
  /* Modal handlers
  =============================*/
  handleOpenModal (modal) {
    this.setState({
      showModal: true,
      modalImage: modal.image
    });
  }
  handleCloseModal () {
    this.setState({
      showModal: false
    });
  }
  addVariantToCart(variantId, quantity){
    console.log(variantId, quantity)
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    console.log(lineItemsToAdd, checkoutId)

    return this.props.client.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
      console.log(res)
      window.location = res.webUrl;
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }
  componentWillMount(){
    // this.props.client.fetchAllProducts().then((res) => {
    //   const theProduct = res.filter(function(product){
    //     return product.id === '10444038162';
    //   });
    //   this.setState({
    //     products: res,
    //     product: theProduct,
    //   });
    // });
    this.props.client.fetchProduct('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzEwNDQ0MDM4MTYy').then((res) => {
      this.setState({
        loading: false,
        product: res
      });
    });
    this.props.client.createCheckout({}).then((res) => {
      this.setState({
        checkout: res,
      });
    });
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoPlay: true,
      autoplaySpeed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px'
    };
    return (
      <div className="landing-page">
        <div className="site-top">
          <div className="container">
            <div className="site-inner">
              <div className="site-header">
                <div className="grid">
                  <div className="col-3_sm-12">
                    <h1 className="logo">
                      <img src={logo} alt="Eddie the Lizard Backpack Logo" />
                    </h1>
                  </div>
                  <div className="col-9 text-right sm-hide">
                  <p className="shipping-note">Free shipping on all orders!</p>
                  <ul className="nav">
                    <li className="nav-link">Faqs</li>
                    <li className="nav-link btn">Buy Now</li>
                  </ul>
                  </div>
                </div>
              </div>
              <div className="site-content-top">
                {this.state.loading &&
                  <div className="grid">
                    <div className="col-12">
                      <h2>Loading</h2>
                    </div>
                  </div>}
                {!this.state.loading &&
                  <Product product={this.state.product} addVariantToCart={(variantId, quantity) => this.addVariantToCart(variantId, quantity)} />}
              </div>
            </div>
          </div>
        </div>
        <div className="site-inner">
          <div className="site-images">
            <Slider {...settings}>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QWlpFeVRfTjlCM1U'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QWlpFeVRfTjlCM1U" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QT1lrOC1FMkJkS0E'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QT1lrOC1FMkJkS0E" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5Qa0ZJazNYQXVPNkE'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5Qa0ZJazNYQXVPNkE" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QR0UxQnM3VExWSGM'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QR0UxQnM3VExWSGM" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QQkVnQURnTkVvSVk'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QQkVnQURnTkVvSVk" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QMVo1aXJWRU9JRXM'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QMVo1aXJWRU9JRXM" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QcUxoc1cwY3Y4bEE'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QcUxoc1cwY3Y4bEE" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QZEdCdThuOE1rWWs'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QZEdCdThuOE1rWWs" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QU1pXanBLdExWbzA'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QU1pXanBLdExWbzA" alt="" /></div>
              <div><img onClick={() => this.handleOpenModal({image: 'https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QOW5PRkxlaEhUTDA'})} src="https://drive.google.com/uc?export=download&id=0B-d6s9zPao5QOW5PRkxlaEhUTDA" alt="" /></div>
            </Slider>
          </div>
        </div>
        <div className="container">
          <div className="site-inner">
            <div className="site-faq">
              <div className="grid-center">
                <div className="col-9 text-center">
                  <h4 className="no-margin">Here's a few answers to our most common questions</h4>
                  <hr />
                </div>
                <div className="col-4_sm-12">
                  <h5>How big are the bags?</h5>
                  <p>The small bag is 8.6" wide, 12.9" tall and 5.9" deep. The large bag is 10.6" wide, 15.7" tall and 8.2" deep.</p>
                  <h5>What is the bag made of?</h5>
                  <p>The exterior is made of polyurethane and the lining is made of polyester. It has a zipper closing system and the straps use an air cushion system.</p>
                  <h5>Do you have a refund policy?</h5>
                  <p>Yes, of course. Within 14 days of receiving the product, send us an <a href="mailto:info@westerwynhollow.com">email</a> and we'll arrange the refund. You send us back the product and we'll offer you a full refund. You are responsible for paying any shipping costs in returning the item.</p>
                </div>
                <div className="col-4_sm-12" data-push-left="off-1">
                  <h5>When will I receive my bag?</h5>
                  <p>After purchase, we will need 3-5 days for processing before shipping. Once we have shipped the product, you will receive an email with a shipping tracking number. From that point, you should receive your bag within 15-25 days.</p>
                  <h5>I haven't received my item yet...</h5>
                  <p>Unfortunatly, accidents happen once in a while, but don't worry, if you do not receive your order within 35 days of the shipping notice, we will offer you a full refund.</p>
                  <h5>Is your checkout secure?</h5>
                  <p>Definitely. We are using <a href="//www.shopify.com/pci-compliant?utm_source=secure&amp;utm_medium=shop">Shopify's</a> world famous checkout to give you peace of mind when you buy.</p>
                </div>
                <div className="col-9 text-center">
                  <h4 className="no-margin">Still have questions? Send us an email at <a href="mailto:info@westerwynhollow.com">info@westerwynhollow.com</a></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer">
          <div className="container">
            <div className="site-inner">
              <div className="grid-center">
                <div className="col-12 text-center">
                  <img className="westerwyn-logo" src={westerwynhollow} alt="Westerwyn Hollow Logo" />
                  <p className="westerwyn-text">a westerwyn hollow product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-footer-bottom">
          <div className="container">
            <div className="site-inner">
              <div className="grid">
                <div className="col-12 text-center">
                  <p>© 2017 Westerwyn Hollow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="background" src={backgroundImg} alt="Background" />
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Modal"
          onRequestClose={this.handleCloseModal}
        >
          <img src={this.state.modalImage} alt="" />
        </Modal>
      </div>
    );
  }
}

export default EddieTheLizard;
