import React, {Component} from 'react';
import VariantSelector from 'components/VariantSelector';
import Client from 'shopify-buy';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  componentWillMount() {
    let selectedOptions = {};
    this.props.product.options.forEach((selector) => {
      selectedOptions[selector.name] = selector.values[0].value
    });
    const selectedVariant = Client.Product.Helpers.variantForOptions(this.props.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image,
      selectedOptions: selectedOptions
    });
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = Client.Product.Helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
      <div className="grid">
        <div className="col-5_sm-12 padding">
          <div className="grid">
            {variantSelectors}
          </div>
          <div className="grid">
            <div className="col-6 padding">
              <button className="btn" onClick={() => this.props.addVariantToCart(variant.id, variantQuantity)}>Buy Now</button>
            </div>
            <div className="col-6 padding text-right">
              <h3 className="product-price">${variant.price}</h3>
            </div>
          </div>
          <div className="grid">
            <div className="col-12">
              <a className="shopify-secure-badge" href="//www.shopify.com/pci-compliant?utm_source=secure&amp;utm_medium=shop" title="This online store is secured by Shopify" target="_blank"><img src="//cdn.shopify.com/s/images/badges/shopify-secure-badge-light-shadow.png" alt="Shopify secure badge" /></a>
              <p className="shopify-secure-text">Buy with confidence using Shopify’s secure checkout.</p>
            </div>
          </div>
        </div>
        <div className="col-6_sm-12_sm-first padding" data-push-left="off-1_sm-0">
          {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
        </div>
      </div>
    );
  }
}

export default Product;