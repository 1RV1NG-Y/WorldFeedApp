import React, {Component} from "react"
import {View, Text, Image, ScrollView, Linking, ScrollViewBase} from 'react-native'
import axios from 'axios'
import { Card, Title, Paragraph} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/AppBar'

export default class HomeScreen extends Component {
    state = {
        articles:[],
        isLoading: true,
        errors:null
    };

    getArticles() {
        axios
            .get(
                "https://newsapi.org/v2/everything?q=Apple&pageSize=10&apiKey=a420de595dbb4f8abab9d389f4ac0868"
            )
            .then(response =>
                response.data.articles.map(article => ({
                    date : `${article.publishedAt}`,
                    title : `${article.title}`,
                    url : `${article.url}`,
                    description : `${article.description}`,
                    urlToImage : `${article.urlToImage}`,
                }))
            )
            .then(articles => {
                this.setState({
                    articles,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false}))
        
    }
    componentDidMount(){
        this.getArticles();
    }

    render(){
        const { isLoading, articles } =  this.state;
        return(<SafeAreaProvider>
            <View>
             
                <ScrollView>
                    {!isLoading ? (
                        articles.map(article => {
                            const { date, title, url, description, urlToImage}= article;
                            return (
                                <Card
                                key={url}
                                style ={{marginTop:10, borderColor: 'black', borderBottomWidth: 5}}
                                onPress={()=>{Linking.openURL(`${url}`)}}
                                >
                                    <View style={{flexDirection:'row'}}>
                                        {}
                                        <View>
                                            <View style={{justifycontent:'space:around', flex:2/3, marginTop:10}}>
                                                <Title>{title}</Title>
                                            </View>
                                        </View>
                                        {}
                                        <View style={{flex:1/3,margin:10}}>
                                            <Image style= {{width:120, height:120}} source ={{uri: urlToImage}}></Image>
                                        </View>
                                    </View>
                                    <View style={{margin:10}}>
                                        <Paragraph> {description} </Paragraph>
                                        <Text>Publisged At {date}:</Text>
                                    </View>

                                </Card>
                            );
                        }) 

                    ) :( <Text style= {{justifycontent: 'center', alingItems:'center'}}> Loading... </Text>
                    )}
                </ScrollView>
            </View></SafeAreaProvider>
        )

    }
}

