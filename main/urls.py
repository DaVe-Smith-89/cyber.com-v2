from django.urls import path
from django.views.generic import TemplateView
from .views import EhiView, google_login, auth, LogoutView
from .admin import websiteAdmin

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('home/', TemplateView.as_view(template_name='index.html'), name='home'),
    path('about/', TemplateView.as_view(template_name='index.html'), name='about'),
    path('tools/', TemplateView.as_view(template_name='index.html'), name='tools'),
    path('lessons/', TemplateView.as_view(template_name='index.html'), name='lessons'),
    path('posts/', TemplateView.as_view(template_name='index.html'), name='posts'),
    path('ehi/', TemplateView.as_view(template_name='index.html'), name='ehi'),
    path('technews/', TemplateView.as_view(template_name='index.html'), name='technews'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('web/admin/', websiteAdmin.urls),
    path('ehi/exchange/<int:primary_key>/', EhiView.as_view(), name='ehiExchange'),
    path('login/', google_login, name='login'),
    path('auth/', auth, name='auth'),
]