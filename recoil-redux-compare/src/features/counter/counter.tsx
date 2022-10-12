import React from 'react'
import { useAppSelector, useAppDispatch } from './Hooks'
import { decrease, increase } from './counterSlice'

export const Counter = () => {
    const count = useAppSelector(state => state.counter.count);
    const dispatch = useAppDispatch()

    return (
        <>
            <div>Count: {count}</div>
            <button onClick={() => dispatch(increase())}>+</button>
            <button onClick={() => dispatch(decrease())}>-</button>
        </>
    )
}