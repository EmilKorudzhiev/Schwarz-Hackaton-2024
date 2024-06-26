import Product from "@/classes/Product";
import { Text, View } from "../Themed";
import { StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";

interface ProductProps {
    product: Product,
    onAdd: () => void

}

export default function ProductButton({product, onAdd}: ProductProps ) {
    const [added, setAdded] = useState<boolean>(product.added);

    const handleAdd = () => {
        setAdded(true);
        product.added = true;
        onAdd();
    };

    const handleRemove = () => {
        setAdded(false);
        product.added = false;
    }

    const handleToggle = () => {
        if (added) handleRemove()
        else handleAdd();
    }

    return (
        <TouchableHighlight onPress={handleToggle}>
            <View style={styles.productButton}>
                <Text style={styles.productButtonText}>{product.name}</Text>
                {added ? <Text>Added</Text> : null}
            </View>
        </TouchableHighlight>
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