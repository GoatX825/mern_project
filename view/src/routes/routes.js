import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store';
import HomePage from '../pages/home/home.page'
import LoginPage from '../pages/home/login.page'
import RegisterPage from '../pages/home/register.page'
import ErrorPage from '../pages/home/error.page'
import AdminLayout from '../pages/cms/admin.page'
import AdminDashboard from '../pages/cms/admin-dashboard.page'
import UserListPage from '../pages/cms/user-list.page'
import ProductDetail from '../pages/home/product-detail.page'
import BannerListPage from '../pages/cms/banner-list.page'
import BannerCreatePage from '../pages/cms/banner-create.page'
import BannerEditPage from '../pages/cms/banner-edit.page'

import BrandEditPage from '../pages/cms/brand/brand-edit.page'
import BrandListPage from '../pages/cms/brand/brand-list.page'
import BrandCreatePage from '../pages/cms/brand/brand-create.page'

import CategoryListPage from '../pages/cms/category/category-list.page'
import CategoryCreatePage from '../pages/cms/category/category-create.page'
import CategoryEditPage from '../pages/cms/category/category-edit.page'

import UsersListPage from '../pages/cms/user/user-list.page'
import UsersCreatePage from '../pages/cms/user/user-create.page'
import UsersEditPage from '../pages/cms/user/user-edit.page'

import ProductListPage from '../pages/cms/product/product-list.page'
import ProductCreatePage from '../pages/cms/product/product-create.page'
import ProductEditPage from '../pages/cms/product/product-edit.page'
import CategoryList from '../pages/home/category-list.page';
import HomePageLayout from '../pages/home/home-layout.page';


// {component} is props destructure :: PrivateComponent can be considered as react middleware
const PrivateComponent = ({ component }) => {
    let is_logged_in = localStorage.getItem('token');
    return (is_logged_in ? component : <Navigate to='/login' />)
}


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        <Route path='/' element={<HomePageLayout/>}>
                            <Route index element={<HomePage />} />
                            <Route path='login' element={<LoginPage />} />
                            <Route path='register' element={<RegisterPage />} />
                            <Route path='product/:slug' element={<ProductDetail />} />
                            <Route path='category/:slug' element={<CategoryList />} />
                        </Route>

                        <Route path='/admin' element={<PrivateComponent component={<AdminLayout />} />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path='user' element={<UserListPage />} />

                            <Route path='banner' element={<BannerListPage />} />
                            <Route path='banner/create' element={<BannerCreatePage />} />
                            <Route path='banner/:id' element={<BannerEditPage />} />

                            <Route path='brand' element={<BrandListPage />} />
                            <Route path='brand/create' element={<BrandCreatePage />} />
                            <Route path='brand/:id' element={<BrandEditPage />} />

                            <Route path='category' element={<CategoryListPage />} />
                            <Route path='category/create' element={<CategoryCreatePage />} />
                            <Route path='category/:id' element={<CategoryEditPage />} />


                            <Route path='users' element={<UsersListPage />} />
                            <Route path='user/create' element={<UsersCreatePage />} />
                            <Route path='user/:id' element={<UsersEditPage />} />

                            <Route path='product' element={<ProductListPage />} />
                            <Route path='product/create' element={<ProductCreatePage />} />
                            <Route path='product/:id' element={<ProductEditPage />} />

                        </Route>

                        <Route path='/customer' element={<PrivateComponent component={<AdminLayout />} />} >
                            <Route index element={<AdminDashboard />} />
                        </Route>

                        {/* (* => wild card: read any url ) call this url always at last */}
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </Provider>
            </BrowserRouter>
        </>
    )
}

export default Routing;