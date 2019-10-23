const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },     //英雄名称
    avatar: { type: String },   //英雄头像
    title: { type: String },    //称号
    //分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 评分
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    // 技能
    skills: [{
        icon: { type: String },
        name: { type: String },
        desciption: { type: String },
        tips: { type: String }
    }],
    // 顺风出装推荐
    items1: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    // 逆风出装推荐
    items2: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
    ],
    usageTips: { type: String },    //使用技巧
    battleTips: { type: String },   //对抗技巧
    teamTips: { type: String },     //团战思路
    //英雄关系-搭档
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        desciption: { type: String }
    }],
})

module.exports = mongoose.model('Hero', schema)