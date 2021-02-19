import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneItem } from './actions/items';
import FormModal from './FormModal';
import { CardImg, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';

const ItemDetails = () => {
    // shows details about an item
    const dispatch = useDispatch();
    const { currUser } = useSelector(st => st.currUser);
    const { item_id } = useParams();
    const { items } = useSelector(st => st.items);
    const { token } = useSelector(st => st.token);
    useEffect(() => {
        dispatch(getOneItem(token, item_id)).catch(e => alert(e));
    }, []);
    return (
        <div className="container">
            {!Array.isArray(items) ? <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{items.Name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{items.location}</CardSubtitle>
                    <CardText>{items.description}</CardText>
                    <CardText>Quantity: {items.quantity}</CardText>
                    {currUser.is_admin ? <FormModal buttonLabel="Edit Item" formType="item" item={items} /> : null}
                </CardBody>
            </Card> : "Loading..."}
        </div>
    );
};
export default ItemDetails;