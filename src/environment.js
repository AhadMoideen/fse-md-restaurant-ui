const environment = {
    baseURL : "http://127.0.0.1:8000"
}

if(process.env.REACT_APP_ENV === 'dev'){
    environment.baseURL = "http://EC2-C4C5-LB-724116359.ap-south-1.elb.amazonaws.com"
}

if(process.env.REACT_APP_ENV === 'stg'){
    environment.baseURL = "http://EC2-C4C5-LB-724116359.ap-south-1.elb.amazonaws.com"
}

if(process.env.REACT_APP_ENV === 'prod'){
    environment.baseURL = "http://EC2-C4C5-LB-724116359.ap-south-1.elb.amazonaws.com"
}


export default environment;