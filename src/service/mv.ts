import request from './request'

export const getNewMovie = (limmit = 3, area = '') => {
    return request.get(`/mv/first?limit=${limmit}&area=${area}`)
}
