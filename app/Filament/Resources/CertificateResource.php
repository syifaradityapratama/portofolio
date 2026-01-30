<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CertificateResource\Pages;
use App\Filament\Resources\CertificateResource\RelationManagers;
use App\Models\Certificate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CertificateResource extends Resource
{
    protected static ?string $model = Certificate::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Certificates';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Certificate Details')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Certificate Name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('issuer')
                            ->label('Issuing Organization')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\DatePicker::make('issued_at')
                            ->label('Issue Date')
                            ->required(),
                        Forms\Components\TextInput::make('credential_url')
                            ->url()
                            ->label('Credential URL (Optional)'),
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->imageEditor()
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('4:3')
                            ->imageResizeTargetWidth('800')
                            ->imageResizeTargetHeight('600')
                            ->directory('certificates')
                            ->label('Certificate Image (Optional)'),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Feature on Homepage')
                            ->default(false),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('issuer')
                    ->searchable(),
                Tables\Columns\TextColumn::make('issued_at')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListCertificates::route('/'),
            'create' => Pages\CreateCertificate::route('/create'),
            'edit' => Pages\EditCertificate::route('/{record}/edit'),
        ];
    }
}
