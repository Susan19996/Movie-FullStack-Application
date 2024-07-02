
import React from "react";
import Avatar from "@material-ui/core/Avatar";

const UserReview = ({user, review}) =>
    <div className="row">
        <div className="col-2">
            <div className="d-flex justify-content-center">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6otvEkGLOAqWORBtQVPih0k2fAmZvs4WYkAzBqvmf7Ncb2t-VQ"/>
            </div>
            <p className="text-center">{user}</p>
        </div>
        <div className="col-10">
            <p>{review}</p>
        </div>
    </div>

export default UserReview;
