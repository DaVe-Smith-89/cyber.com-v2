from pyexpat import model
from django.contrib import admin
from .models import Lesson, Post, Account, Tool, Ehi, TechNews
from django.contrib.auth.models import User

class WebsiteAdmin(admin.AdminSite):
    site_header = 'Website Admin'
    site_title = 'Website Admin'

websiteAdmin = WebsiteAdmin(name='main')

@admin.register(Account)
class AccountAdminConfig(admin.ModelAdmin):
    model = Account
    search_fields = ('userName', 'email')
    list_display = ['userName', 'email', 'is_active', 'is_staff', 'last_login']
    list_filter = ['userImage', 'email']

@admin.register(Ehi)
class EhiAdminConfig(admin.ModelAdmin):
    model = Ehi
    list_display = ['name', 'dateUploaded', 'id']

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Lesson)
admin.site.register(Tool)
admin.site.register(TechNews)

websiteAdmin.register(Post)
websiteAdmin.register(Lesson)
websiteAdmin.register(Tool)
websiteAdmin.register(Ehi)

