# from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserCreateAPIView, ProjectDetail, Projects, DesignDetail, Designs

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/token-auth/', obtain_auth_token),
    path('api/create-company/', UserCreateAPIView.as_view()),
    path('api/projects/', Projects.as_view()),
    path('api/projects/<str:project_id>/', ProjectDetail.as_view()),
    path('api/projects/<str:project_id>/designs/', Designs.as_view()),
    path('api/projects/<str:project_id>/designs/<str:design_id>/', DesignDetail.as_view()),
]
