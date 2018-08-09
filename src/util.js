const https = require('https')
const Url = require('url')
import Config from './config'
import { resolve } from 'path'
export default class {
    static getRequest(url) {
        let urlObj = Url.parse(url)
        let options = {
            host: urlObj.host,
            path: urlObj.path,
            headers: {
                'User-Agent': 'cyy-cli'
            }
        }
        return new Promise((resolve, reject) => {
            https
                .get(options, res => {
                    let buffers = []
                    res.on('data', d => {
                        buffers.push(d)
                    })
                    res.on('end', () => {
                        let bufs = Buffer.concat(buffers)
                        let str = bufs.toString()
                        let result = {}
                        try {
                            result = JSON.parse(str)
                            resolve(result)
                        } catch (e) {
                            console.log(e)
                            reject('请求失败')
                        }
                    })
                })
                .on('error', e => {
                    console.log(e)
                    reject('请求失败')
                })
        })
    }
    static getTList() {
        return this.getRequest(Config.reposUrl)
    }
}
