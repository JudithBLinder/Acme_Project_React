const App = document.querySelector("#app");

const products = axios.get(
  "https://acme-users-api-rev.herokuapp.com/api/products"
);
const companies = axios.get(
  "https://acme-users-api-rev.herokuapp.com/api/companies"
);

const e = React.createElement;

class Products extends React.Component {
  render() {
    let children = [];
    const { products } = this.props;

    for (let i = 0; i < products.length; i++) {
      children.push(
        e("li", { className: "list-group-item" }, `${products[i].name}`)
      );
    }

    return e(
      "ul",
      {
        className: "list-group",
        style: { marginRight: "30%", marginLeft: "5%" },
      },
      ...children
    );
  }
}

class Companies extends React.Component {
  render() {
    let children = [];
    const { companies } = this.props;

    for (let i = 0; i < companies.length; i++) {
      children.push(
        e("li", { className: "list-group-item" }, `${companies[i].name}`)
      );
    }

    return e("ul", { className: "list-group" }, ...children);
  }
}

class mainContainer extends React.Component {
  state = {
    products: [],
    companies: [],
  };

  componentDidMount() {
    Promise.all([products, companies]).then(([productsData, companiesData]) => {
      this.setState({
        products: productsData.data,
        companies: companiesData.data,
      });
      console.log(productsData, companiesData);
    });
  }

  render() {
    const { products, companies } = this.state;
    const header = e(
      "h2",
      { style: { marginLeft: "5%" } },
      `Acme - We have ${products.length} Products and ${companies.length} Companies`
    );
    const productsElement = e(Products, { products: products }, null);
    const companiesElement = e(Companies, { companies: companies }, null);
    const listsContainer = e(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          flexStart: "left",
        },
      },
      productsElement,
      companiesElement
    );

    return e("div", null, header, listsContainer);
  }
}

ReactDOM.render(e(mainContainer), App);
