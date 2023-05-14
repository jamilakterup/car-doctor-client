import {useContext} from "react";
import {useLoaderData} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProviders";
import Swal from 'sweetalert2';

const Checkout = () => {
    const service = useLoaderData();
    const {_id, img, price, title} = service;
    const {user} = useContext(AuthContext)

    const handleCheckOutService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        // const price = form.price.value;
        const date = form.date.value;
        const booking = {customerName: name, email, date, price, img, service: title, service_id: _id}
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire(
                        'Added successfully',
                        'That thing is still around?',
                        'success'
                    )
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-bold my-8">Checkout: {title}</h2>
            <form onSubmit={handleCheckOutService}>
                <div className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.displayName} placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="amount" defaultValue={'$' + price} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;