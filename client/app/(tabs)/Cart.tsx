import { Text, View } from '@/components/Themed'; 
import { useEffect, useState } from 'react';
import Product from '@/classes/Product';
import ProductList from '@/components/cart/ProductList';
import SearchBar from '@/components/cart/SearchBar';
import CalculateRouteButton from "@/components/cart/CalculateRouteButton";
import { StyleSheet } from 'react-native';

async function readCSV(): Promise<Product[]> {
    const response = await fetch("/resources/product_master_data.csv");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const csvData = await response.text();
    let splitCSVData = csvData.split("\n");
    splitCSVData.shift();
    let productArray: Product[] = [];
    splitCSVData.forEach(line => {
        productArray.push(new Product(line));
    });
    return productArray;
}

export default function CartScreen() {
    const [rawProductData, setProductData] = useState<Product[]>([]);
    const [cartScreenToggle, setCartScreenToggle] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const handleEmpty = () => {
        setCartScreenToggle(true);
    };

    const handleNotEmpty = () => {
        setCartScreenToggle(false);
    };

    useEffect(() => {
        async function fetchData() {
            setProductData(await readCSV());
        }
        fetchData();
    }, []);

    const allProductsScreen = (
        <View style={{flex: 1}}>
            <ProductList products={products.filter(prod => !(prod.added))} onAdd={handleEmpty} />
        </View>
    );

    const cartScreen = (
        <View style={{flex: 1}}>
            <ProductList products={products.filter(prod => prod.added)} onAdd={handleEmpty} />
        </View>
    );
    
    return (
        <View style={{flex:1}}>
            <View style={styles.topBar}>
                <SearchBar products={rawProductData} setProducts={setProducts} onEmpty={handleEmpty} onNotEmpty={handleNotEmpty}/>
                {products.length != 0 ? <CalculateRouteButton products={rawProductData}/> : null}
            </View>
            {cartScreenToggle ?  cartScreen : allProductsScreen}
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        display: "flex",
        flexDirection: "row"
    }
});