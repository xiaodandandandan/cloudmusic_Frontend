import request from './request'

export const getNewMovie = () => {
    return request.get('/mv/first?limit=3')
}