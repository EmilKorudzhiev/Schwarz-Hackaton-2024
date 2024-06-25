import Product from "@/classes/Product";
import { Text, View } from "../Themed";
import { Button, StyleSheet } from "react-native";

interface ProductProps {
    product: Product,
    addedProducts?: Product[],
    setAddedProducts?: React.Dispatch<React.SetStateAction<Product[]>>,
    addable?: boolean,
    removable?: boolean

}

export default function ProductButton({addedProducts, product, setAddedProducts, addable, removable}: ProductProps ) {
    const handleAdd = () => {
        if (setAddedProducts != undefined && addedProducts != undefined) {
            setAddedProducts([...addedProducts, product]);
        }
    };

    const handleRemove = () => {
        if (setAddedProducts != undefined && addedProducts != undefined) {
            setAddedProducts(addedProducts.filter(fil => fil.id !== product.id));
        }    
    }

    const addButton = (
        <Button title="+" onPress={handleAdd}/>
    )

    const removeButton = (
        <Button title="-" onPress={handleRemove}/>
)

    return (
        <View style={styles.productButton}>
            <Text style={styles.productButtonText}>{product.name}</Text>
            {addable ? addButton: null}
            {removable ? removeButton : null}
        </View>
    )
}

const styles =  StyleSheet.create({
    productButton: {
        display: "flex",
        flexDirection: "row",
        margin: 3
    },
    productButtonText: {
        width: "100%"
    }
});