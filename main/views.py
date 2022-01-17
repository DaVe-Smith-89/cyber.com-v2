from datetime import datetime
from email import message
from django.contrib import messages
from django.http import HttpResponse
from io import BytesIO
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from authlib.integrations.django_client import OAuth
from main.models import Account, Ehi
from django.contrib.auth import login, logout
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

oauth = OAuth()

oauth.register(
    'google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid profile email'}
)

def google_login(request):
    redirect_uri = request.build_absolute_uri(reverse('auth'))
    return oauth.google.authorize_redirect(request, redirect_uri)

def auth(request):
    token = oauth.google.authorize_access_token(request)
    userData = oauth.google.parse_id_token(request, token)
    try:
        user = Account.objects.get(email=userData.get('email'))
    except:
        user = False
    if not user:
        user = Account(first_name=userData.get('given_name'), last_name=userData.get('family_name'), userName=str(userData.get('given_name') + ' ' + userData.get('family_name')),
                    email=userData.get('email'), userImage=userData.get('picture'), extra_data=userData)
        user.set_unusable_password()
        user.save()
        login(request, user)
    else:
        user = get_object_or_404(Account, email=userData.get('email'))
        user.last_login = datetime.utcnow
        login(request, user)
    return redirect('home')

class LogoutView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('home')

@method_decorator(login_required(login_url='login'), name='get')
class EhiView(View):
    def get(self, request, primary_key, *args, **kwargs):
        ehi = get_object_or_404(Ehi, id=primary_key)
        resp = HttpResponse(ehi.data, content_type="application/vnd.ms-excel")
        resp['Content-Disposition'] = 'inline; filename=' + ehi.name
        return resp

    def post(self, request, *args, **kwargs):
        if request.user.is_admin:
            try:
                print(dir(request.FILES['file']))
                ehi = Ehi(name=request.FILES['file'].name, data=request.FILES['file'].read())
                ehi.save()
                messages.success(request, "File Uploaded successfully!")
            except:
                messages.error(request, "File Not Uploaded!")            
        return redirect('/dashboard')


