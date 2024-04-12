
import TestPage from "../page/TestPage/TestPage";
import TodoPage from "../page/TodoPage/TodoPage";

export const routes = [
    {
        path: '/',
        page: TestPage,
        isShowHeader: true
    },
    {
        path: '/todo',
        page: TodoPage,
        isShowHeader: true
    }
    
    
  
]