import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { getOneItem } from './actions/items';
import FormModal from './FormModal';
import { CardImg, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';
import LoadingModal from './LoadingModal';

const ItemDetails = () => {
    // shows details about an item
    const dispatch = useDispatch();
    const history = useHistory();
    const { currUser } = useSelector(st => st.currUser);
    const { item_id } = useParams();
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);

    const categoriesNameArr = [];
    if (!Array.isArray(items)) {
        for (let category of items.categories) {
            categoriesNameArr.push(category.name);
        }
    }

    useEffect(() => {
        dispatch(getOneItem(token, item_id)).catch(e => {
            alert(e);
            if (e == "No such item") {
                history.push("/items");
            };
        });
    }, []);

    if (Array.isArray(items)) {
        return <LoadingModal modal={true} />;
    } else {
        return (
            <div className="container row justify-content-center">
                { <Card className="col-md-4 shadow mt-4">
                    <CardImg top width="100%" src={items.image_path || "/images/not-available.png"} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{items.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{items.location}</CardSubtitle>
                        <CardText>{items.description}</CardText>
                        <CardText>Quantity: {items.quantity}</CardText>
                        <CardText>Categories: {categoriesNameArr.join(", ")}</CardText>
                        {currUser.is_admin ? <FormModal buttonLabel="Edit Item" formType="item" item={items} /> : null}
                    </CardBody>
                </Card>}
            </div>
        );
    }
};
export default ItemDetails;