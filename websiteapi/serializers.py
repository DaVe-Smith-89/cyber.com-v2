from rest_framework import serializers
from main.models import Account, Ehi, Lesson, Post, Tool, TechNews
from slcyberwarriors.settings import DRF_RECAPTCHA_SECRET_KEY
from requests import post

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'userName', 'userImage', 'is_active']

        read_only_fields = ['id', 'userName', 'userImage', 'is_active']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'userName', 'email', 'userImage', 'is_active']
        
        read_only_fields = ['id', 'email', 'is_active']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson

        fields = ['id', 'title', 'content', 'url', 'source']
        read_only_fields = ['id', 'title', 'content', 'url', 'source']

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=False, read_only=True)
    class Meta:
        model = Post

        fields = ['id', 'title', 'image', 'description', 'datePosted', 'content', 'author']
        #read_only_fields = ['author', 'id', 'datePosted']

class ToolSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=False, read_only=True)
    class Meta:
        model = Tool

        fields = ['id', 'title', 'description', 'readme', 'github', 'author']
        
        #read_only_fields = ['id', 'author']

class TechNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechNews

        fields = ['source', 'date', 'data']
        read_only_fields = ['source', 'date']

class RecaptchaSerializer(serializers.Serializer):
    recaptcha = serializers.CharField()

    def validate_recaptcha(self, value):
        data = {
            'response': value,
            'secret': DRF_RECAPTCHA_SECRET_KEY
        }

        resp = post('https://www.google.com/recaptcha/api/siteverify', data=data)
        result_json = resp.json()
        print(result_json)

        if not result_json.get('success'):
            raise serializers.ValidationError('recaptcha is not validated!')

        return value
    
class EhiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ehi

        fields = ['id', 'name']
        read_only_fields = ['id', 'name']

