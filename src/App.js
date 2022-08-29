import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from '@/routes';
import { DefaultLayout } from './layouts';

function App() {
    return (
        <Router>
            <>
                <Routes>
                    {publicRoutes.map((routes, index) => {
                        let Layout = DefaultLayout;

                        if (routes.layout) {
                            Layout = routes.layout;
                        } else if (routes.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = routes.component;

                        return (
                            <Route
                                key={index}
                                path={routes.path}
                                element={
                                    <>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </>
                                }
                            />
                        );
                    })}
                </Routes>
            </>
        </Router>
    );
}
// 27:35 video 96
export default App;
