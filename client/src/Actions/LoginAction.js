import {
    LOGIN,
    LOGIN_ERROR,
    REGISTER,
    REGISTER_ERROR,
    REST_API_ADDRESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCESS
} from './index';

export function login(username, password){
    return dispach=>{
        return fetch(REST_API_ADDRESS+'login', {
            method: "post",
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    console.log(json);
                    dispach({
                        type: LOGIN,
                        payload: {
                            username: json.data.username,
                            password: json.data.password,
                            _id: json.data._id,
                            Created_date: json.data.Created_date,
                            profilepicture: json.data.profilepicture
                        }
                    })
                }else{
                    dispach({
                        type: LOGIN_ERROR,
                        payload: json.err
                    })
                }
            })
    }
}

export function register(username, password){
    return dispach=>{
        return fetch(REST_API_ADDRESS+'register', {
            method: "post",
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    dispach({
                        type: REGISTER,
                        payload: {
                            username: json.data.username,
                            password: json.data.password,
                            _id: json.data._id,
                            Created_date: json.data.Created_date
                        }
                    })
                }else{
                    dispach({
                        type: REGISTER_ERROR,
                        payload: json.err
                    })
                }
            })
    }
}

export function updateUser(user){
    return dispach=>{
        return fetch(REST_API_ADDRESS+'user/'+user._id,{
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>{res.json(); console.log(res)})
            .then(json=>{
                if(json.sucess){
                    dispach({
                        type: UPDATE_USER_SUCESS,
                        payload: {
                            username: json.data.username,
                            password: json.data.password,
                            _id: json.data._id,
                            Created_date: json.data.Created_date,
                            profilepicture: json.data.profilepicture === ""?null:json.data.profilepicture
                        }
                    });
                    console.log(json)
                }else{
                    dispach({
                        type: UPDATE_USER_ERROR,
                        payload: json.err
                    })
                }
            })
    }
}