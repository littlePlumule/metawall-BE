const Success = {
  message: "成功訊息"
}

const Error = {
  message: "錯誤訊息"
}

const Sign = {
  token: "abcde",
  nickname: "test" 
}

const Mailer = {
  message: "請至 Email 查收信件"
}

const User = {
  status: "success",
  data: {
    _id: "62bd81280e4fd7c1a022ad29",
    nickName: "sss",
    gender: "male",
    avatar: "",
    createdAt: "2022-06-30T10:55:36.985Z",
    updateAt: "2022-06-30T10:55:36.986Z",
    followers: [],
    followings: []
  }
}

const getPosts = {
  status: "success",
  data: {
    page: {
      currentPage: 1,
      perPage: 10,
      total: 4,
      totalPage: 1
    },
    list: [
      {
        _id: "abcd",
        editor: {
          _id: "abcd",
          nickName: "test",
          avatar: ""
        },
        content: "test",
        image: "",
        likes: [],
        createdAt: "2022-06-27T05:36:11.352Z",
        updateAt: "2022-06-27T05:36:11.352Z",
        comments: []
      },
    ]
  }
}

const getPost = {
  status: "success",
  data: {
    _id: "abcd",
    editor: "abcd",
    content: "test",
    image: "",
    likes: [],
    createdAt: "2022-06-27T05:35:22.393Z",
    updateAt: "2022-06-27T05:35:22.393Z",
    comments: []
  }
}

const Post = {
  status: "success",
  data: {
    _id: "abcd",
    editor: "abcd",
    content: "test",
    image: "",
    likes: [],    
    createdAt: "2022-07-19T07:39:37.049Z",
    updateAt: "2022-07-19T07:39:37.049Z"
  }
}

const createComment = {
  status: "success",
  data: {
    _id: "abcd",
    editor: "abcd",
    post: "abcd",
    comment: "test",
    image: "",    
    createdAt: "2022-07-19T07:50:07.626Z",
    updateAt: "2022-07-19T07:50:07.626Z"
  }
}

const updateComment = {
  status: "success",
  data: {
    _id: "abcd",
    editor: {
      _id: "abcd",
      nickName: "test",
      avatar: "",
      createdAt: "2022-06-27T05:33:27.387Z"
    },
    post: "abcd",
    comment: "test",
    image: "",
    createdAt: "2022-07-19T07:50:07.626Z",
    updateAt: "2022-07-19T07:50:07.626Z"
  }
}

const Follow = {
  status: "success",
  data: {
    list: []
  }
}

const Like = {
  status: "success",
  data: []
}

const upload = {
  status: "success",
  data: {
    imgUrl: "https://i.imgur.com/xxx.jpg"
  }
}

const createOrder = {
  status: "success",
  data: {
    MerchantID: "abcd",
    TradeInfo: "abcd",
    TradeSha: "abcd",
    Version: "1.5",
    MerchantOrderNo: 12345
  }
}

const getOrders = {
  status: "success",
  data: [
    {
      _id: "abcd",
      itemDesc: "test",
      amt: 1000,
      merchantOrderNo: "12345",
      paymentStatus: 0,
      payTime: 0
    },
  ]
}

const getOrder = {
  status: "success",
  data: {
    _id: "abcd",
    user: "abcd",
    itemDesc: "test",
    amt: 1000,
    merchantOrderNo: "12345",
    paymentStatus: 0,
    payTime: 0
  }
}

module.exports = {
  Success,
  Error,
  Sign,
  Mailer,
  User,
  getPosts,
  getPost,
  Post,
  createComment,
  updateComment,
  Follow,
  Like,
  upload,
  createOrder,
  getOrders,
  getOrder
}