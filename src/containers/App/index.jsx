import React from 'react'
import { Layout, Row, Col } from 'antd'
import { Order } from '../../components/Order'

class Application extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { Content, Header, Footer } = Layout
        return (
            <div>
                <Layout>
                    <Content>
                        <Order />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Application