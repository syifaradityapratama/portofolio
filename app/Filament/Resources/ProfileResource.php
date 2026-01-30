<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfileResource\Pages;
use App\Filament\Resources\ProfileResource\RelationManagers;
use App\Models\Profile;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProfileResource extends Resource
{
    protected static ?string $model = Profile::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('role')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Toggle::make('is_open_to_work')
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Bio')
                    ->schema([
                        Forms\Components\Textarea::make('bio')
                            ->required()
                            ->maxLength(65535)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->imageEditor()
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('1:1')
                            ->imageResizeTargetWidth('500')
                            ->imageResizeTargetHeight('500')
                            ->directory('profile')
                            ->label('Profile Photo'),
                        Forms\Components\FileUpload::make('logo')
                            ->image()
                            ->imageEditor()
                            ->directory('profile')
                            ->label('Site Logo (Optional)'),
                        Forms\Components\FileUpload::make('resume')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('profile')
                            ->label('Resume (PDF)'),
                    ]),

                Forms\Components\Section::make('Social Links')
                    ->schema([
                        Forms\Components\TextInput::make('linkedin')
                            ->url()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('github')
                            ->url()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('whatsapp')
                            ->tel()
                            ->placeholder('628...')
                            ->helperText('Format: 628xxxxxxxx (No spaces/dashes)'),
                        Forms\Components\TextInput::make('google_analytics_id')
                            ->label('Google Analytics ID')
                            ->placeholder('G-XXXXXXXXXX')
                            ->helperText('Your GA4 Measurement ID'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('role')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_open_to_work')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProfiles::route('/'),
            'create' => Pages\CreateProfile::route('/create'),
            'edit' => Pages\EditProfile::route('/{record}/edit'),
        ];
    }
}
