import { Schema } from 'mongoose';

// 어떤 테스트인지? 사실 테스트는 1개만 만들 것이지만, 나중에 확장성을 위해 만든다.
export default new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});
