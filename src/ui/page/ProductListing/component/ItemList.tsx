import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {ProductData} from "../../../../data/ProductData.ts";

function fetchProductData() {
    const productData: ProductData[] = [
        {
            "pid": 1,
            "name": "Scarpa Drago",
            "price": 1250.00,
            "image_url": "https://bananafingers.com/media/catalog/product/s/c/scarpa_0023_70017-000-1_dra_yel_drago_yellow_2.jpg",
            "has_stock": true
        },
        {
            "pid": 2,
            "name": "Scarpa Booster",
            "price": 1200.00,
            "image_url": "https://bananafingers.com/media/catalog/product/b/o/booster_with_logo_0_4.jpg",
            "has_stock": true
        },
        {
            "pid": 3,
            "name": "Five-Ten Dragon",
            "price": 999.00,
            "image_url": "https://bananafingers.com/media/catalog/product/b/c/bc0827_sl_b2ccat_smaller_4.jpg",
            "has_stock": false
        },
        {
            "pid": 4,
            "name": "La Sportiva Solution",
            "price": 1333.00,
            "image_url": "https://bananafingers.com/media/catalog/product/l/a/la_sportiva_solution_2_2.jpg",
            "has_stock": true
        },
        {
            "pid": 5,
            "name": "La Sportiva Theory",
            "price": 1200.00,
            "image_url": "https://bananafingers.com/media/catalog/product/2/0/20w_999100_1jpg_2.jpg",
            "has_stock": true
        },
        {
            "pid": 6,
            "name": "TOKYO POWDER",
            "price": 175.00,
            "image_url": "https://shop.tokyopowder.com/cdn/shop/products/black1.jpg?v=1673511063",
            "has_stock": true
        },
        {
            "pid": 7,
            "name": "Moon Dust",
            "price": 50.00,
            "image_url": "https://bananafingers.com/media/catalog/product/m/o/moon-dust-loose-min_1.jpg",
            "has_stock": true
        },
        {
            "pid": 8,
            "name": "Snap Climbing Chalk Pocket Zip",
            "price": 130.00,
            "image_url": "https://bananafingers.com/media/catalog/product/m/o/moon-dust-loose-min_1.jpg",
            "has_stock": true
        },
        {
            "pid": 9,
            "name": "Red Chili Giant Chalk Bag",
            "price": 125.00,
            "image_url": "https://bananafingers.com/media/catalog/product/3/6/36004_897a.webp_1.png",
            "has_stock": true
        },
        {
            "pid": 10,
            "name": "Wild Country Syncro Chalkbag",
            "price": 200.00,
            "image_url": "https://bananafingers.com/media/catalog/product/w/i/wildcountry-syncro-chalkbag-backpack_1.jpg",
            "has_stock": true
        }
    ]
    return productData.map((value) => (
        <Grid xs={4}>
            <Box sx={{minWidth: 275, maxWidth: 400, margin: 0}}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {value.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                <img src={value.image_url}
                                     alt={value.name}
                                     loading="lazy"
                                height='120px'/>
                            </Typography>
                            <Typography variant="body2">
                                ${value.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">Add to Cart</Button>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        </Grid>
    ));
}

export default function ItemList() {
    return <>
        <Grid container maxWidth={1200}>
            {fetchProductData()}
        </Grid>
    </>
}